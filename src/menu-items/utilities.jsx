// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'users',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Add User',
      type: 'item',
      url: '/admin/blog/blog-post',
    },
    {
      id: 'util-color',
      title: 'User List',
      type: 'item',
      url: '/blogs',
    },
    {
      id: 'sample-page',
      title: 'User View',
      type: 'item',
      url: 'user',
    },

  ]
};

export default utilities;
