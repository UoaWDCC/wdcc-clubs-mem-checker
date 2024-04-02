import ColorPickerItem from './ColorPickerItem';
import { useContext, Dispatch, SetStateAction } from 'react';
import { PageContextProvider } from '../EditCheckerPage';
import IPage from '../../../types/IPage';

export const ColorPicker = () => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];
  return (
    <>
      <div className='text-black py-2 opacity-75 px-3 my-4 border-b-2 border-gray-300'>
        choose your theme colours*
      </div>
      <ColorPickerItem
        color={page.backgroundColor ? page.backgroundColor : '#ECECECEE'}
        setColor={(color: string) => {
          setPage({ ...page, backgroundColor: color });
        }}
        title="background color"
      />
      <ColorPickerItem
        color={page.titleTextColor ? page.titleTextColor : '#000000EE'}
        setColor={(color: string) => {
          setPage({ ...page, titleTextColor: color });
        }}
        title="title text colour"
      />
      <ColorPickerItem
        color={
          page.textFieldBackgroundColor
            ? page.textFieldBackgroundColor
            : '#E0E0E0EE'
        }
        setColor={(color: string) => {
          setPage({ ...page, textFieldBackgroundColor: color });
        }}
        title="text field background colour"
      />
      <ColorPickerItem
        color={page.textFieldtextColor ? page.textFieldtextColor : '#000000EE'}
        setColor={(color: string) => {
          setPage({ ...page, textFieldtextColor: color });
        }}
        title="text field text colour"
      />
      <ColorPickerItem
        color={
          page.dropDownBackgroundColor
            ? page.dropDownBackgroundColor
            : '#4F4F4FEE'
        }
        setColor={(color: string) => {
          setPage({ ...page, dropDownBackgroundColor: color });
        }}
        title="dropdown background colour"
      />
      <ColorPickerItem
        color={page.buttonColor ? page.buttonColor : '#4F4F4FEE'}
        setColor={(color: string) => {
          setPage({ ...page, buttonColor: color });
        }}
        title="button colour"
      />
    </>
  );
};
