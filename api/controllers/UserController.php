<?php

namespace api\controllers;

use yii\rest\ActiveController;
use common\models\User;
use Yii;

class UserController extends ActiveController
{
    public $modelClass = 'common\models\User';

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate()
    {
        $body = Yii::$app->request->post();
        $model = new User();
        $model->load(Yii::$app->request->post(), '');
        $model->setPassword($body['encrypted_password']); // hash password
        $model->generateAuthKey();

        if ($model->save()) {
            return ['status' => 'success', 'user_id' => $model->id];
        }
        return ['status' => 'error', 'errors' => $model->errors];
    }
}
