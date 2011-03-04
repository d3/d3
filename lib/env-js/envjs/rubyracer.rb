require 'v8'
require 'net/http'
require 'uri'
require 'thread'

include Config

lock  = Mutex.new
class Runtime
  def new_context()
    V8::Context.new
  end
  def configure_context(runtime, context)
    ruby = {}
    Module.included_modules.each{|m| 
      #puts "adding module #{m}"
      ruby[m.to_s] = m
    }
    Module.constants.each{|c| 
      #puts "adding constant #{c}"
      ruby[c.to_s] = Kernel.eval(c)
    }
    Kernel.global_variables.each{|g| 
      #puts "adding global variable #{g}"
      ruby[g.to_s] = Kernel.eval(g)
    }
    Kernel.methods.each{|m| 
      #puts "adding global method #{m}"
      ruby[m.to_s] = Kernel.method(m)
    }
    ruby['CONFIG'] = CONFIG
    ruby['gc'] = lambda{ GC.start() }
    context['Ruby']  = ruby
    
    context['__this__']  = context
    context['File']      = File
    #context['sync']      = lambda{|fn| Proc.new{|*args|lock.synchronize {fn.call(*args)}} }
    context['sync']      = lambda{|fn| Proc.new{|*args| fn.call(*args) }}
    #context['spawn']     = lambda{|fn| Thread.new {fn.call}}
    context['spawn']     = lambda{|fn| fn.call}
    context['print']     = lambda{|msg| puts msg}
    context['fopen']     = lambda{|name, mode| File.open(name, mode)}
    context['runtime']   = runtime
    context['new_context']   = lambda{
      rt = Runtime.new
      ct = rt.new_context()
      rt.configure_context(rt, ct)
      ct['_eval'] = lambda{|script| ct.eval(script)}
      ct.eval('var t = new Function(); t._eval = __this__._eval;t;') 
    }
    context['HTTPConnection'] = HTTPConnection.new
  end
end

class HTTPConnection
  def connect(host, port)
    Net::HTTP.start(host, port)
  end
  def request(httpMethod, path)
    case httpMethod
    when "GET" then return Net::HTTP::Get.new(path) 
    when "PUT" then return Net::HTTP::Put.new(path) 
    when "POST" then return Net::HTTP::Post.new(path)
    when "HEAD" then return Net::HTTP::Head.new(path)
    when "DELETE" then return Net::HTTP::Delete.new(path)
    else return nil
    end
  end
  def go(connection, request, headers, data)
    headers.each{|key,value| request.add_field(key,value)}
    response, body = connection.request(request, data)
    respheaders = Hash.new
    response.each_header do |name, value|
      respheaders.store(name, value)
    end
    response['body'] = body
    [response, respheaders]
  end
  def finish(connection)
    connection.finish if connection.started?
  end
end

runtime = Runtime.new
global = runtime.new_context()
runtime.configure_context(runtime, global)
envjs = ARGV[0]
global.load(envjs)


