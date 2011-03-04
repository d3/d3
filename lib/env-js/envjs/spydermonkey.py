import spidermonkey
import threading
import platform
import httplib
import time
import sys
import os

runtime = spidermonkey.Runtime()
context = runtime.new_context()
lock = threading.Lock()
        
def load(filename):
    script = ''
    f = open(filename, 'r')
    script = f.read()
    context.execute(script)
    
def _print(string):
    print string    
    
def _open(url, mode):
    return open(url, mode)

def _exit():
	return os._exit(1)
	
def new_global():
	nc = runtime.new_context()
	configure_context(nc)
	return nc.execute('''
		this.execute = global.execute;
		this;
	''')

def configure_context(context):  
	context.add_global('os', os)
	context.add_global('sys', sys)
	context.add_global('time', time)
	context.add_global('$lock', lock);
	context.add_global('exit', _exit)
	context.add_global('fopen', _open)
	context.add_global('print', _print)
	context.add_global('httplib', httplib)
	context.add_global('platform', platform)
	context.add_global('threading', threading)
	context.add_global('global', context)
	context.add_global('runtime', runtime)
	context.add_global('new_global', new_global)

configure_context(context)
 
if __name__=='__main__':
    argv = sys.argv
    if os.path.isfile( argv[1] ):
        load(argv[1])