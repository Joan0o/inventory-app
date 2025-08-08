<?php
namespace api\controllers;

use Yii;
use yii\rest\Controller;
use common\models\User;
use yii\web\Response;

class AuthController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        // Allow CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        return $behaviors;
    }

    public function actionLogin()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $body = Yii::$app->request->post();

        $user = User::find()->where(['name' => $body['username' ?? null]])->one();

        if (!$user || !User::validatePassword($body['password'], $user->getPasswordHash())) {
            return ['success' => false, 'message' => 'Invalid credentials'];
        }

        $token = Yii::$app->security->generateRandomString();
        $user->auth_key = $token;
        $user->save(false);

        return [
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->name,
                'role' => $user->role
            ]
        ];
    }
}
