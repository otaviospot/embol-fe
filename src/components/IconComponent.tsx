import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as VscIcons from 'react-icons/vsc';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

const allIcons = {
  ...GiIcons,
  ...MdIcons,
  ...RiIcons,
  ...VscIcons,
  ...AiIcons,
  ...GoIcons,
  ...IoIcons,
  ...BiIcons,
};

interface IIconComponent {
  icon: string;
  size?: number;
}
type IReactIcon = keyof typeof allIcons;

const IconComponent: React.FC<IIconComponent> = ({ icon, size }) => {
  const DynamicIconComponent = allIcons[icon as IReactIcon];

  if (undefined === DynamicIconComponent) return <></>;

  return <DynamicIconComponent size={size} />;
};

export default IconComponent;
