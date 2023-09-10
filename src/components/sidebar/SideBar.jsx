import './sidebar.css';

import { Sidebar,Button } from 'flowbite-react';
import { HiInbox, HiShoppingBag, HiViewBoards } from 'react-icons/hi';
import InlineDropdown from './DropMenu';
import { auth } from '../../firebase/config';

export default function ContentSeparator() {
  return (
    <Sidebar>
      
      <Sidebar.Items className='sidebar_item_container'>
        
        <Sidebar.ItemGroup className='sidebar_item_group'>
          <Sidebar.Logo
        href="#"
        img="/vite.svg"
        imgAlt="Flowbite logo"
      >
        <p>
          S.R. Ferros
        </p>
      </Sidebar.Logo>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="E-commerce"
          >
            <Sidebar.Item href="#">
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Sales
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Refunds
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Shipping
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href="/inventory"
            icon={HiViewBoards}
          >
            <p>
              Inventory
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="/billing"
            icon={HiInbox}
          >
            <p>
              Billing
            </p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className='sidebar_item_group'>
          <Sidebar.Item className="p-0">
            <InlineDropdown className='w-full'></InlineDropdown>
          </Sidebar.Item>
          <Sidebar.CTA className='p-0'>
            {/* <button className='w-full h-full  bg-blue-600 p-3 rounded-md text-white'>Logout</button> */}
            <Button onClick={()=> auth.signOut()} className='w-full'>LOG OUT</Button>
          </Sidebar.CTA>
          {/* <Sidebar.Item
            className='p-0 px-0 sidebar_cta_button'
          >
            <Button className='w-full p-0 cta_button'>LogOut</Button>
          </Sidebar.Item> */}
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}


