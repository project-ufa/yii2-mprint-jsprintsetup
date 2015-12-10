mPrint widget
=============
mPrint prints the desired elements in your HTML page

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist projectufa/yii2-mprint "dev-master"
```

or add

```
"projectufa/yii2-mprint": "dev-master"
```

to the require section of your `composer.json` file.


Usage
-----

Once the extension is installed, simply use it in your code by  :

```php
<?= \projectufa\mprint\MPrintWidget::widget(); ?>```