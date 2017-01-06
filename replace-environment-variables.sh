#!/bin/bash
sed -i "s/SERVER_NAME=.*/SERVER_NAME=$SERVER_NAME/g" production.env
sed -i "s/SERVER_PORT=.*/SERVER_PORT=$SERVER_PORT/g" production.env
