# Use 1 Free Late Day
# Hyun Hee Park & Yun Seo Park

import socket
import threading
import sys
import datetime


#TODO: Implement a client that connects to your server to chat with other clients here

# Use sys.stdout.flush() after print statemtents

serverName = '127.0.0.1'

hostName = sys.argv[3]
serverPort = int(sys.argv[5])
userName = sys.argv[7]
passcode = sys.argv[9]


clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientSocket.connect((serverName, serverPort))
clientSocket.send(passcode.encode())


def receive_message(clientSocket):
	while True:
		try:
			serverMsg = clientSocket.recv(1024).decode()

			if serverMsg == ':Exit':
				sys.stdout.flush()
				clientSocket.close()
				return
			else:
				print(serverMsg)
				sys.stdout.flush()
		except:
			clientSocket.close()


def send_message(clientSocket):
	while True:
		try:
			msg_received = input()
		
			if msg_received == ':)':
				msg = userName + ': [feeling happy]'
			elif msg_received == ':(':
				msg = userName + ': [feeling sad]'
			elif msg_received == ':mytime':
				msg = userName + ': ' + datetime.datetime.now().strftime("%c")
			elif msg_received == ':+1hr':
				msg = userName + ': ' + (datetime.datetime.now() + 	datetime.timedelta(hours = 1)).strftime("%c")
			elif msg_received == ':Exit':
				msg = userName +  ' left the chatroom'
			else:
				msg = userName + ': ' + msg_received

			clientSocket.send(msg.encode())
		
		except EOFError:
			clientSocket.close()
			break
			

serverMsg = clientSocket.recv(1024).decode()

if serverMsg != 'Incorrect passcode':
	clientSocket.send(userName.encode())
	
	print(f'Connected to {hostName} on port {serverPort}')
	sys.stdout.flush()
	
	msg = clientSocket.recv(1024).decode()
	print(msg)
	sys.stdout.flush()
	
	receiveMsg_thread = threading.Thread(target=receive_message, args=(clientSocket,))
	receiveMsg_thread.start()

	sendMsg_thread = threading.Thread(target=send_message, args=(clientSocket,))
	sendMsg_thread.start()

else:
	print(serverMsg)
	sys.stdout.flush()
	clientSocket.close()
	sys.exit(1)
			


if __name__ == "__main__":
	pass
