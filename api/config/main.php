<?php

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'api\controllers',
    'bootstrap' => [],
    'components' => [
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'cookieValidationKey' => 'your-secret-key',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableSession' => false, // API is stateless
            'loginUrl' => null,
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => false,
            'showScriptName' => true,
            'rules' => [
                ['class' => 'yii\rest\UrlRule', 'controller' => ['category', 'subcategory', 'product', 'user']],
            ],
        ],
    ],
];
