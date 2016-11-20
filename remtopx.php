<?php

/**
 * Here's a simple PHP file that converts CSS with REM measurements to PX
 */

error_reporting(E_ALL & ~E_NOTICE);
function console_log()
{
    echo "[", date('Y-m-d H:i:s'), "]\t", join(' ', func_get_args()), PHP_EOL;
}

$file = isset($argv[1]) ? $argv[1] : '';

if (!$file || !file_exists($file)) {
    die('First argument must be specified and must be a file that exists.' . PHP_EOL);
}
$tmp = explode('.', $file);
$ext = array_pop($tmp);
console_log('processing file', $file);
$outfile = isset($argv[2]) ? $argv[1] : (dirname($file) . DIRECTORY_SEPARATOR . basename($file, $ext) . 'px.' . $ext);
console_log('Output file is : ', $outfile);
$content = file_get_contents($file);
console_log('file length: ', strlen($content));

$rootSize = intval(isset($argv[2]) ? $argv[2] : 0) ?: 10;
console_log('Root size:', $rootSize, 'px');

$replaced = 0;
$newContent = preg_replace_callback('/(\d*(\.?\d+))?\s*rem/', function ($matches) use ($rootSize) {
    return (floatval($matches[1]) * $rootSize) . 'px';
}, $content, -1, $replaced);

console_log('Replaced:', $replaced, 'items');
file_put_contents($outfile, $newContent);
console_log('Written to output file, new size: ', filesize($outfile));