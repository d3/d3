require 'johnson'
require 'net/http'
require 'uri'
require 'thread'

include Config

def configure_context(context)
  context['global']    = context
  context['HTTPConnection'] = HTTPConnection.new
end

class HTTPConnection
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
end

global = Johnson::Runtime.new
configure_context(global)
envjs = ARGV[0]
global.load(envjs)


