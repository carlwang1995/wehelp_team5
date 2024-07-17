# 第五組團隊合作開發練習
## 目錄
* [團隊分工](https://github.com/carlwang1995/wehelp_team5?tab=readme-ov-file#%E5%9C%98%E9%9A%8A%E5%88%86%E5%B7%A5)
* [成果展示](https://github.com/carlwang1995/wehelp_team5?tab=readme-ov-file#%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA)

## 團隊分工
### 組長：王維耀
* 負責Host專案
* index.html排版規劃、CSS樣式處理
* 成果報告
### 前端：林干紘
* JavaScript實作全臺雨量觀測圖表視覺功能
* 與組長確認HTML版面是否符合實作需求
* 與後端溝通API需回傳的資料格式
### 前端：王薇婷
* JavaScript實作各縣市氣象預報圖表視覺功能
* 與組長確認HTML版面是否符合實作需求
* 與後端溝通API需回傳的資料格式  
### 後端：黃挺剛
* 使用FastAPI搭建網站後端，提供全臺雨量觀測資料之API接口
* Fetch氣象局Opendata API，取得並依前端需求整理資料
* 與前端溝通API需回傳的資料格式
* 將網站上線至雲端服務(AWS EC2)
### 後端：王孟茹
* 使用FastAPI搭建網站後端，提供各縣市氣象預報資料之API接口
* Fetch氣象局Opendata API，取得並依前端需求整理資料
* 與前端溝通API需回傳的資料格式
 
## 成果展示
### 網站連結：[第五組－全臺雨量觀測及氣象預報](http://35.155.26.96:8000/)
* 功能一：全臺過去三天雨量觀測值圖表產生
  * 點選左側臺灣地圖，生成對應行政區之觀測資料
  * 右側折線圖呈現過去三天(72小時)雨量觀測之歷史資料
  ![](https://raw.githubusercontent.com/carlwang1995/photos/main/01.png)
* 功能二：各縣市未來36小時氣象預報
  * 點擊圖表上方時段(分為三個半天)，可切換顯示時段預報資訊
  * 預報資訊包含：縣市名稱、天氣概況(圖示)，以及最高、低氣溫
  ![](https://raw.githubusercontent.com/carlwang1995/photos/main/02.png)
