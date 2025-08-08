<?php

namespace common\models;

use Yii;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $name
 * @property string $password_hash
 * @property string|null $salt
 * @property string|null $status
 * @property string|null $role
 * @property string $auth_key
 * @property int $deleted
 */
class User extends \yii\db\ActiveRecord implements IdentityInterface
{

    /**
     * ENUM field values
     */
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const ROLE_ADMIN = 'admin';
    const ROLE_BASIC = 'basic';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['salt', 'status', 'role'], 'default', 'value' => null],
            [['deleted'], 'default', 'value' => 0],
            [['name', 'password_hash', 'auth_key'], 'required'],
            [['status', 'role'], 'string'],
            [['deleted'], 'integer'],
            [['name', 'password_hash', 'salt', 'auth_key'], 'string', 'max' => 250],
            ['status', 'in', 'range' => array_keys(self::optsStatus())],
            ['role', 'in', 'range' => array_keys(self::optsRole())],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'password_hash' => 'Password Hash',
            'salt' => 'Salt',
            'status' => 'Status',
            'role' => 'Role',
            'auth_key' => 'Auth Key',
            'deleted' => 'Deleted',
        ];
    }


    /**
     * column status ENUM value labels
     * @return string[]
     */
    public static function optsStatus()
    {
        return [
            self::STATUS_ACTIVE => 'active',
            self::STATUS_INACTIVE => 'inactive',
        ];
    }

    /**
     * column role ENUM value labels
     * @return string[]
     */
    public static function optsRole()
    {
        return [
            self::ROLE_ADMIN => 'admin',
            self::ROLE_BASIC => 'basic',
        ];
    }

    /**
     * @return string
     */
    public function displayStatus()
    {
        return self::optsStatus()[$this->status];
    }

    /**
     * @return bool
     */
    public function isStatusActive()
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function setStatusToActive()
    {
        $this->status = self::STATUS_ACTIVE;
    }

    /**
     * @return bool
     */
    public function isStatusInactive()
    {
        return $this->status === self::STATUS_INACTIVE;
    }

    public function setStatusToInactive()
    {
        $this->status = self::STATUS_INACTIVE;
    }

    /**
     * @return string
     */
    public function displayRole()
    {
        return self::optsRole()[$this->role];
    }

    /**
     * @return bool
     */
    public function isRoleAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function setRoleToAdmin()
    {
        $this->role = self::ROLE_ADMIN;
    }

    /**
     * @return bool
     */
    public function isRoleBasic()
    {
        return $this->role === self::ROLE_BASIC;
    }

    public function setRoleToBasic()
    {
        $this->role = self::ROLE_BASIC;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        // If you don't use API tokens, you can throw an exception
        // Or look up a column like "access_token"
        return static::findOne(['access_token' => $token]);
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    public function setPassword($password)
    {
        $salt = '321321';
        $saltedInput = $password . $salt;
        $hash = hash('sha256', $saltedInput);
        $customizedHash = strrev(substr($hash, 0, 16));

        echo var_dump($saltedInput, $customizedHash); 
        $this->setPasswordHash($customizedHash);
    }

    public static function validatePassword($password, $userhash)
    {
        $salt = '321321';
        $saltedInput = $password . $salt;
        $hash = hash('sha256', $saltedInput);
        $customizedHash = strrev(substr($hash, 0, 16));

        return $customizedHash === $userhash;
    }

    public function setPasswordHash($p){
        $this->password_hash = $p;
    }
    public function getPasswordHash()
    {
        return $this->password_hash;
    }
}
