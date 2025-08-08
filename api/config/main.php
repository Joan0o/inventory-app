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
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => [
                        'category',
                        'subcategory',
                        'product',
                        'user'
                    ],
                ],
                [
                    'pattern' => 'api/auth/login',
                    'route' => 'api/auth/login',
                    'verb' => 'POST',
                ],
            ],
        ],
    ],
    'as corsFilter' => [
        'class' => \yii\filters\Cors::class,
        'cors' => [
            'Origin' => ['http://localhost:4200'], // ← For development only (or restrict to 'http://localhost:4200')
            'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            'Access-Control-Allow-Credentials' => true,
            'Access-Control-Allow-Headers' => ['*'],
        ],
    ],
];
