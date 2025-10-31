import type { Meta, StoryObj } from '@storybook/html';

const SIDEBAR_TOKENS = [
  '--ubits-sidebar-bg','--ubits-sidebar-logo','--ubits-sidebar-button-bg-pressed','--ubits-sidebar-button-bg-disabled','--ubits-sidebar-button-bg-active','--ubits-sidebar-button-fg-default','--ubits-sidebar-button-fg-hover','--ubits-sidebar-button-fg-pressed','--ubits-sidebar-button-fg-active','--ubits-sidebar-button-fg-disabled'
] as const;

const meta: Meta = {
  title: 'Tokens/Colors/Sidebar Colors',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function swatch(token: string, theme: 'light' | 'dark') {
  const root = document.documentElement;
  document.body.setAttribute('data-theme', theme);
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  const isWhite = /^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(value);
  const bg = isWhite
    ? 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50%/12px 12px'
    : value;
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '520px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '8px';
  wrap.style.padding = '6px 8px';
  wrap.style.border = '1px solid #e5e7eb';
  wrap.style.borderRadius = '8px';
  const nameEl = document.createElement('code');
  nameEl.textContent = token;
  const box = document.createElement('div');
  box.style.height = '28px';
  box.style.width = '120px';
  box.style.borderRadius = '6px';
  box.style.border = '1px solid #9ca3af';
  box.style.background = bg;
  const val = document.createElement('code');
  val.textContent = value;
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.gap = '8px';
  right.style.alignItems = 'center';
  right.appendChild(box);
  right.appendChild(val);
  wrap.appendChild(nameEl);
  wrap.appendChild(right);
  return wrap;
}

export const LightAndDark: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '1fr 1fr';
    container.style.gap = '16px';

    const lightCol = document.createElement('div');
    lightCol.style.background = '#ffffff';
    lightCol.style.border = '1px solid #e5e7eb';
    lightCol.style.borderRadius = '10px';
    lightCol.style.padding = '12px';
    const lightTitle = document.createElement('h4');
    lightTitle.textContent = 'Light';
    lightCol.appendChild(lightTitle);

    const darkCol = document.createElement('div');
    darkCol.style.background = '#0E1825';
    darkCol.style.color = '#edeeef';
    darkCol.style.border = '1px solid #0E1825';
    darkCol.style.borderRadius = '10px';
    darkCol.style.padding = '12px';
    const darkTitle = document.createElement('h4');
    darkTitle.textContent = 'Dark';
    darkCol.appendChild(darkTitle);

    SIDEBAR_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });

    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  },
};
