#!/usr/bin/env python3

#from Tkinter import *
# if you are working under Python 3, comment the previous line and comment out the following line
from tkinter import *
from time import sleep

root = Tk()
mpos = StringVar()
mpos.set("(0,0)")

w = Label(root, textvariable = mpos)
w.pack()

def update():
	x,y = root.winfo_pointerxy()
	mpos.set("(" + str(x) + ", " + str(y) + ")")
	root.after(100, update)
	
root.after(100, update)
root.mainloop()