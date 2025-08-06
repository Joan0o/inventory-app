<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "User".
 *
 * @property int $id
 * @property string $name
 * @property string $encrypted_password
 * @property string|null $salt
 * @property string|null $status
 * @property string|null $role
 */
class User extends \yii\db\ActiveRecord
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
        return 'User';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['salt', 'status', 'role'], 'default', 'value' => null],
            [['name', 'encrypted_password'], 'required'],
            [['status', 'role'], 'string'],
            [['name', 'encrypted_password', 'salt'], 'string', 'max' => 250],
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
            'encrypted_password' => 'Encrypted Password',
            'salt' => 'Salt',
            'status' => 'Status',
            'role' => 'Role',
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
}
