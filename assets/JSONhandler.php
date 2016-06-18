<?php
$file = 'memory.json';
$current = file_get_contents('php://input');
file_put_contents($file, $current);