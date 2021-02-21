#!/bin/bash

openssl genrsa -out keys/private-key.rsa 4096
openssl rsa -in keys/private-key.rsa -pubout > keys/public-key.pem