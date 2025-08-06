<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "subcategory".
 *
 * @property int $id
 * @property int|null $category_id
 * @property string|null $name
 * @property string|null $status
 * @property int $product_count
 *
 * @property Category $category
 * @property Product[] $products
 */
class Subcategory extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'subcategory';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['category_id', 'name', 'status'], 'default', 'value' => null],
            [['product_count'], 'default', 'value' => 1],
            [['category_id', 'product_count'], 'integer'],
            [['status'], 'string'],
            [['name'], 'string', 'max' => 250],
            ['status', 'in', 'range' => array_keys(self::optsStatus())],
            [['category_id'], 'exist', 'skipOnError' => true, 'targetClass' => Category::class, 'targetAttribute' => ['category_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'category_id' => 'Category ID',
            'name' => 'Name',
            'status' => 'Status',
            'product_count' => 'Product Count',
        ];
    }

    /**
     * Gets query for [[Category]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCategory()
    {
        return $this->hasOne(Category::class, ['id' => 'category_id']);
    }

    /**
     * Gets query for [[Products]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProducts()
    {
        return $this->hasMany(Product::class, ['subcategory_id' => 'id']);
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
}
