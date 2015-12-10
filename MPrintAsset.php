<?php

namespace projectufa\mprint;

use yii\web\AssetBundle;
use yii;
use yii\helpers\FileHelper;
use yii\helpers\Json;


class MPrintAsset extends AssetBundle
{

    public $sourcePath = '@projectufa/mprint/assets';

    public static $staticSourcePath = '@projectufa/mprint/assets';

    public $js = [
        'js/mprint.js',
    ];

    public $css = [
        'css/mprint.css',
    ];

    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];

    public static function getPublishedDir()
    {
        return static::$staticSourcePath;
    }
}
