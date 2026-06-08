// models/Product.js — JSON file-based Product model

const fs   = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/products.json');

const read = () => {
  try {
    if (!fs.existsSync(DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch { return []; }
};

const write = (data) => {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

class Product {
  // Find with optional query filters, sort, skip, limit
  static async find(query = {}, opts = {}) {
    let data = read();

    // Filter
    if (query.$or) {
      const terms = query.$or.map(q => {
        const [field, val] = Object.entries(q)[0];
        return { field, regex: val.$regex ? new RegExp(val.$regex, val.$options || 'i') : null };
      });
      data = data.filter(p => terms.some(t => t.regex && t.regex.test(p[t.field] || '')));
    }
    if (query.category) data = data.filter(p => p.category === query.category);
    if (query.featured  === true)  data = data.filter(p => p.featured);
    if (query._id && query._id.$ne) data = data.filter(p => p._id !== query._id.$ne);

    // Sort
    if (opts.sort) {
      const [field, dir] = Object.entries(opts.sort)[0];
      data.sort((a, b) => {
        const av = a[field], bv = b[field];
        if (typeof av === 'string') return dir === 1 ? av.localeCompare(bv) : bv.localeCompare(av);
        return dir === 1 ? av - bv : bv - av;
      });
    } else {
      // default: newest (by index desc)
      data = data.reverse();
    }

    // Skip & limit
    if (opts.skip)  data = data.slice(opts.skip);
    if (opts.limit) data = data.slice(0, opts.limit);

    return data;
  }

  // Chainable-style builder (returns array — simplified)
  static find_chain(query = {}) {
    let data = read();
    let _sort = null, _skip = 0, _limit = null;

    if (query.$or) {
      const terms = query.$or.map(q => {
        const [field, val] = Object.entries(q)[0];
        return { field, regex: val.$regex ? new RegExp(val.$regex, val.$options || 'i') : null };
      });
      data = data.filter(p => terms.some(t => t.regex && t.regex.test(p[t.field] || '')));
    }
    if (query.category) data = data.filter(p => p.category === query.category);
    if (query.featured === true) data = data.filter(p => p.featured);
    if (query._id && query._id.$ne) data = data.filter(p => p._id !== query._id.$ne);

    const chain = {
      sort(s)  { _sort = s; return chain; },
      skip(n)  { _skip = n; return chain; },
      limit(n) { _limit = n; return chain; },
      then(resolve) {
        let d = [...data];
        if (_sort) {
          const [field, dir] = Object.entries(_sort)[0];
          d.sort((a, b) => {
            const av = a[field] ?? '', bv = b[field] ?? '';
            if (typeof av === 'string') return dir === 1 ? av.localeCompare(bv) : bv.localeCompare(av);
            return dir === 1 ? av - bv : bv - av;
          });
        } else { d = d.reverse(); }
        if (_skip)  d = d.slice(_skip);
        if (_limit) d = d.slice(0, _limit);
        resolve(d);
      }
    };
    return chain;
  }

  static async findById(id) {
    return read().find(p => p._id === id) || null;
  }

  static async countDocuments(query = {}) {
    let data = read();
    if (query.$or) {
      const terms = query.$or.map(q => {
        const [field, val] = Object.entries(q)[0];
        return { field, regex: val.$regex ? new RegExp(val.$regex, val.$options || 'i') : null };
      });
      data = data.filter(p => terms.some(t => t.regex && t.regex.test(p[t.field] || '')));
    }
    if (query.category) data = data.filter(p => p.category === query.category);
    return data.length;
  }

  static async create(item) {
    const data = read();
    const newItem = {
      ...item,
      _id: Date.now().toString() + Math.random().toString(36).slice(2,6),
      createdAt: new Date().toISOString(),
      featured: item.featured || false,
      rating: item.rating || 4.5,
      numReviews: item.numReviews || 0,
    };
    data.push(newItem);
    write(data);
    return newItem;
  }

  static async insertMany(items) {
    const data = [];
    items.forEach((item, i) => {
      data.push({
        ...item,
        _id: (Date.now() + i).toString(),
        createdAt: new Date().toISOString(),
      });
    });
    write(data);
    return data;
  }

  static async findByIdAndUpdate(id, update) {
    const data = read();
    const idx  = data.findIndex(p => p._id === id);
    if (idx !== -1) { data[idx] = { ...data[idx], ...update }; write(data); return data[idx]; }
    return null;
  }

  static async findByIdAndDelete(id) {
    const data = read();
    const idx  = data.findIndex(p => p._id === id);
    if (idx !== -1) { const del = data.splice(idx, 1); write(data); return del[0]; }
    return null;
  }

  static async deleteMany() { write([]); }

  static async aggregate(pipeline) {
    const data = read();
    // Support simple $group with $sum
    if (pipeline[0] && pipeline[0].$group) {
      const g = pipeline[0].$group;
      if (g.total && g.total.$sum === '$stock') {
        return [{ total: data.reduce((s, p) => s + (p.stock || 0), 0) }];
      }
      if (g._id === '$category') {
        const map = {};
        data.forEach(p => { map[p.category] = (map[p.category] || 0) + 1; });
        return Object.entries(map).map(([k, v]) => ({ _id: k, count: v }));
      }
    }
    return [{ total: 0 }];
  }
}

module.exports = Product;
