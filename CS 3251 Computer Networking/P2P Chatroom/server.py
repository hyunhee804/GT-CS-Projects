# Use 1 Free Late Day
# Hyun Hee Park & Yun Seo Park

import socket
import threading
import sys
import datetime


#TODO: Implement all code for your server here

# Use sys.stdout.flush() after print statemtents

serverName = '127.0.0.1'
serverPort = int(sys.argv[3])
serverPasscode = sys.argv[5]

clients = [] # maintain a list of clients

def on_new_client(connectionSocket, addr):
	userPasscode = connectionSocket.recv(1024).decode()

	if serverPasscode != userPasscode:
		msg = 'Incorrect passcode'
		print(msg)
		sys.stdout.flush()
		connectionSocket.send(msg.encode())
		connectionSocket.close()
	else:
		msg = '1'
		connectionSocket.send(msg.encode())
			
		userName = connectionSocket.recv(1024).decode()
		msg = userName + ' joined the chatroom'
		print(msg)
		sys.stdout.flush()
			
		if len(clients) != 0:
			for client in clients:
				client.send(msg.encode())						
		
		clients.append(connectionSocket)
			
	#user sends new message
	if len(clients) != 0:
		while True:
			msg = connectionSocket.recv(1024).decode()
			print(msg)
			sys.stdout.flush()
			for client in clients:
				if client != connectionSocket:
					client.send(msg.encode())



serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.bind((serverName, serverPort))
serverSocket.listen(7)

print(f'Server started on port {serverPort}. Accepting connections')
sys.stdout.flush()

while True:
	client, addr = serverSocket.accept()
	threading._start_new_thread(on_new_client, (client, addr))	
	
serverSocket.close()


if __name__ == "__main__":
	pass