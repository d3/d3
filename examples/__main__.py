import os
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

tornado.options.define("port", default=8888, type=int)

if __name__ == "__main__":
  tornado.options.parse_command_line()
  application = tornado.web.Application([
    (r"/(.*)", tornado.web.StaticFileHandler,
      {"path": ".", "default_filename": "index.html"}),
  ])
  http_server = tornado.httpserver.HTTPServer(application)
  http_server.listen(tornado.options.options.port)
  print "http://localhost:%d/examples/" % tornado.options.options.port
  tornado.ioloop.IOLoop.instance().start()
