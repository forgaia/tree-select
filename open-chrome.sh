#!/bin/sh

killall 'Google Chrome'
open -na Google\ Chrome --args --user-data-dir= --ignore-certificate-errors --disable-web-security --disable-site-isolation-trials
