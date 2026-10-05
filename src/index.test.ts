import * as antd from 'antd';
import * as ui from './index';
import * as dataDisplay from './components/data-display';
import * as dataEntry from './components/data-entry';
import * as feedback from './components/feedback';
import * as general from './components/general';
import * as layout from './components/layout';
import * as navigation from './components/navigation';
import * as other from './components/other';

// antd runtime exports we deliberately do not expose.
const EXCLUDED = new Set([
  'unstableSetRender', // antd's own unstable escape hatch, typed `any`
]);

// Components with library logic (see docs/WRAPPING_GUIDE.md). Everything else must be antd itself.
const WRAPPERS = new Set([
  'Button',
  'Checkbox',
  'DatePicker',
  'Form',
  'Input',
  'InputNumber',
  'Modal',
  'Radio',
  'Select',
  'Switch',
  'Table',
  'Upload',
]);

// antd's private statics (`__ANT_*`, `_Internal…`, `SECRET_…`) are not public API.
const PRIVATE = /^(_|SECRET_)/;

const categories = { general, layout, navigation, dataEntry, dataDisplay, feedback, other };

describe('public API coverage', () => {
  const antdKeys = Object.keys(antd).filter((k) => !EXCLUDED.has(k));

  it.each(antdKeys)('exports %s', (key) => {
    expect(ui).toHaveProperty(key);
  });

  it.each(antdKeys.filter((k) => !WRAPPERS.has(k)))('re-exports antd %s untouched', (key) => {
    expect(ui[key as keyof typeof ui]).toBe(antd[key as keyof typeof antd]);
  });

  it.each([...WRAPPERS])('wraps %s without dropping antd statics', (key) => {
    const wrapped = ui[key as keyof typeof ui] as unknown as Record<string, unknown>;
    const original = antd[key as keyof typeof antd] as unknown as Record<string, unknown>;
    expect(wrapped).not.toBe(original);
    for (const prop of Object.keys(original)) {
      if (['$$typeof', 'render', 'displayName'].includes(prop) || PRIVATE.test(prop)) continue;
      expect(wrapped, `${key}.${prop}`).toHaveProperty(prop);
    }
  });

  it('puts every component in exactly one category', () => {
    const seen = new Map<string, string>();
    for (const [category, exports] of Object.entries(categories)) {
      for (const name of Object.keys(exports)) {
        expect(seen.get(name), `${name} in ${category} and ${seen.get(name)}`).toBeUndefined();
        seen.set(name, category);
      }
    }
  });

  it('keeps each component in its documented category', () => {
    const names = (m: object) => Object.keys(m).sort();
    expect(names(general)).toEqual(['Button', 'FloatButton', 'Typography']);
    expect(names(layout)).toEqual([
      'Col',
      'Divider',
      'Flex',
      'Grid',
      'Layout',
      'Masonry',
      'Row',
      'Space',
      'Splitter',
    ]);
    expect(names(navigation)).toEqual([
      'Anchor',
      'Breadcrumb',
      'Dropdown',
      'Menu',
      'Pagination',
      'Steps',
      'Tabs',
    ]);
    expect(names(feedback)).toEqual(
      [
        'Alert',
        'Drawer',
        'Modal',
        'Popconfirm',
        'Progress',
        'Result',
        'Skeleton',
        'Spin',
        'Tour',
        'message',
        'notification',
      ].sort(),
    );
  });
});
