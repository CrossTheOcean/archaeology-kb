/**
 * 考古知识库应用 - 核心JS
 */

// 全局状态
const App = {
  data: null,
  currentPage: '',
  
  init() {
    this.loadData();
    this.highlightNav();
    this.bindSearch();
  },
  
  async loadData() {
    try {
      // 内联数据（从data-index.js加载）
      if (typeof KB_DATA !== 'undefined') {
        this.data = KB_DATA;
        this.onDataLoaded();
      } else {
        // 如果数据未加载，显示加载状态
        console.log('等待数据加载...');
        setTimeout(() => this.loadData(), 100);
      }
    } catch (e) {
      console.error('数据加载失败:', e);
    }
  },
  
  onDataLoaded() {
    // 各页面自定义初始化
    if (window.onAppDataLoaded) {
      window.onAppDataLoaded(this.data);
    }
  },
  
  highlightNav() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === filename) {
        item.classList.add('active');
      }
    });
  },
  
  bindSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;
    
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 300);
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          window.location.href = `reports.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  },
  
  handleSearch(query) {
    // 实时搜索建议（可选）
    if (!this.data || query.length < 2) return;
    
    const matches = this.data.reports.filter(r => 
      r.name.includes(query) || 
      r.province.includes(query) ||
      r.era.includes(query)
    ).slice(0, 5);
    
    // 可以在这里显示搜索建议下拉框
    console.log('搜索建议:', matches);
  },
  
  formatNumber(num) {
    if (num >= 10000) return (num / 10000).toFixed(1) + '万';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  },
  
  formatDate(dateStr) {
    return dateStr;
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// 工具函数
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
