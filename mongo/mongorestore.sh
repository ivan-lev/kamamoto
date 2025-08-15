#!/bin/bash

# Restore from dump
mongorestore --uri mongodb://localhost:27017 --gzip --archive=db_dump_full
