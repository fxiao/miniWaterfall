# miniWaterfall
一个小 动态 瀑布流

## 使用

### 调用

```
$("#goods_waterfall").miniWaterfall();
```

### 默认参数

```
{
url: window.location.href,
row: 4, 
row_id: "waterfall_id_",
row_class: "waterfall_class",
tpl_id: "#tpl",
loading_id: "#loading",
page: 1,
perpage: 10
}
```

### json 返回格式

```
{
    "photos": {
        "total": 60,
        "photo": [{
            "name": "heyun51@gmail.com",
            "price": "359.00",
            "id": 1796,
            "quantity": 0
        }],
        "perpage": 10,
        "page": 4,
        "pages": 6
    },
    "stat": "ok"
}
```

### 模块定义

模块中的变量跟返回的 json 内容 photo 部分有关，

```
<script id='tpl' type="tpl">
<div class="goods_little_block_img"><img src="{image}" title="{name}"></div>
<span class="good_price">¥ {price}</span>
</script>
```
