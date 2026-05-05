# 考古学专刊·丁种 智能知识库

基于71本《考古学专刊·丁种》发掘报告构建的考古领域结构化知识库，支持教学、研究与智能问答应用。

📊 **在线访问**：https://crosstheocean.github.io/archaeology-kb/

---

## 数据规模

| 指标 | 数值 |
|------|------|
| 考古报告 | 71本 |
| 总页数 | 24,851页 |
| 标注实体 | 324,735个 |
| 实体类别 | 28类 |
| 抽取关系 | 443,060条 |
| 关系类型 | 7种 |
| 遗址数量 | 70处（含GIS坐标） |

---

## 仓库结构

```
archaeology-kb/
├── docs/                          # GitHub Pages 站点
│   ├── index.html                 # 门户首页
│   └── app/                       # 智能应用
│       ├── index.html             # 应用导航
│       ├── qa.html                # 智能问答系统
│       ├── map.html               # GIS遗址分布图
│       ├── relations.html         # 关系网络可视化
│       ├── stats.html             # 数据统计仪表盘
│       └── js/                    # 前端数据与引擎
│           ├── data-index.js          # 71报告索引
│           ├── knowledge-base.js      # 实体统计知识库
│           └── relations-index.js     # 关系数据索引
├── reports_md/                    # 标注数据（每报告4文件）
│   ├── {遗址名}_实体数据.json
│   ├── {遗址名}_标注报告.md
│   ├── {遗址名}_全本实体数据.json
│   └── {遗址名}_全本标注报告.md
├── output/                        # 产出数据
│   ├── relations_all_reports.json   # 全量关系数据（LFS）
│   ├── relations_sample.csv         # 关系样例
│   ├── archaeology_sites.geojson    # GIS地理数据
│   ├── archaeology_sites_map.html   # 交互式地图
│   └── province_stats.png           # 省份统计图
├── scripts/                       # 数据处理脚本
│   ├── extract_relations.py       # 关系抽取
│   ├── generate_gis_map.py        # GIS地图生成
│   └── generate_kb_js.py          # 前端知识库生成
└── pdf_raw/                       # 原始PDF（Release附件）
```

---

## 快速开始

### 1. 浏览在线应用
直接访问 GitHub Pages 站点：
- 🏠 **门户**：https://crosstheocean.github.io/archaeology-kb/
- ❓ **智能问答**：https://crosstheocean.github.io/archaeology-kb/app/qa.html
- 🗺️ **遗址地图**：https://crosstheocean.github.io/archaeology-kb/app/map.html
- 🔗 **关系网络**：https://crosstheocean.github.io/archaeology-kb/app/relations.html
- 📊 **数据统计**：https://crosstheocean.github.io/archaeology-kb/app/stats.html

### 2. 使用标注数据

```python
import json

# 加载某遗址的实体数据
with open('reports_md/殷墟_全本实体数据.json', 'r') as f:
    data = json.load(f)

# 查看实体统计
for category, entities in data['entities'].items():
    print(f"{category}: {len(entities)}个")
```

### 3. 加载关系数据

```python
import json

with open('output/relations_all_reports.json', 'r') as f:
    relations = json.load(f)

# 查询某遗址的关系
site_relations = [r for r in relations if r['report'] == '殷墟']
```

### 4. 运行关系抽取脚本

```bash
cd scripts
python extract_relations.py
```

### 5. 生成GIS地图

```bash
cd scripts
python generate_gis_map.py
```

---

## 原始PDF获取

71本原始PDF（约3GB）以分卷形式提供下载：

📦 **Release 下载**：https://github.com/CrossTheOcean/archaeology-kb/releases/tag/v1.0.0

| 文件 | 大小 | 说明 |
|------|------|------|
| `pdf_raw.tar.gz.part-aa` | 1.9GB | 分卷1 |
| `pdf_raw.tar.gz.part-ab` | 981MB | 分卷2 |

**解压命令**：
```bash
cat pdf_raw.tar.gz.part-* | tar -xzf -
```

---

## 核心功能

### 28类实体标注体系

| 大类 | 实体类别 | 示例 |
|------|----------|------|
| 遗址信息 | 遗址名称、发掘地点、发掘年份 | 殷墟、河南安阳、1928年 |
| 遗迹单位 | 遗迹编号、层位关系 | H127、第3层下 |
| 遗物信息 | 青铜器、陶器、玉器、石器、骨器、漆器 | 司母戊鼎、灰陶鬲、玉琮 |
| 形制纹饰 | 器型、纹饰、颜色 | 圆腹、饕餮纹、朱红 |
| 测量数据 | 尺寸、重量、比例 | 高133cm、重875kg |
| 时代判定 | 文化性质、分期、年代 | 商代晚期、二里岗期 |
| 考古方法 | 发掘方法、记录方式、保存状况 | 探方发掘、整体提取 |

### 7种关系类型

| 关系 | 示例 |
|------|------|
| contains（包含） | 墓葬M5 → 包含 青铜器 |
| excavates（发掘） | 遗址 → 发掘出 遗物 |
| era（年代） | 遗物 → 属于 商代 |
| material（材质） | 器物 → 材质为 青铜 |
| type（类型） | 器物 → 类型为 鼎 |
| measurement（测量） | 器物 → 尺寸为 高30cm |
| stratigraphy（层位） | 遗迹 → 层位关系 打破 |

---

## 应用场景

1. **课堂教学**：实体高亮、情境还原、三维想象训练
2. **备课组卷**：自动命制材料分析题、构建干扰项
3. **会议讲座**：数据可视化、动态检索演示
4. **学术论文**：支撑量化分析、引文格式化
5. **数据挖掘**：跨遗址比较、时空分布分析

---

## 技术栈

- **数据处理**：Python + 正则表达式抽取
- **GIS可视化**：Folium + GeoJSON
- **前端应用**：原生 HTML/JS/CSS（无后端依赖）
- **部署**：GitHub Pages
- **大文件存储**：Git LFS + GitHub Release

---

## 引用

如果您在研究中使用了本知识库，请引用：

```
考古学专刊·丁种 智能知识库. GitHub, 2026.
https://github.com/CrossTheOcean/archaeology-kb
```

---

## 许可

标注数据遵循原始考古报告的学术使用规范，仅供教学与研究使用。
