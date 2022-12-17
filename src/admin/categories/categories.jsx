import api, { useCancelablePromise } from '@/services/api';
import { useState } from 'react';
import { Modal } from '@/services/overlay';
import Box from '@/components/common/Box';
import HelperBox from '@/components/common/HelperBox';
import Button from '@/components/common/Button';
import {
  Table,
  TableEmptyFallback,
  TableField,
  TableRow,
} from '@/components/common/Table';
import CategoryCreate from './categoryCreate';
import apis, { useFetch } from '@/services/api';

export default function Categories() {
  const [showModal, setShowModal] = useState();
  const [categories, , reload] = useFetch(
    () => apis.getCategories(),
    [],
    [],
  );
  
  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      return apis.removeCategory(id).then(() => reload()); 
    }
  }

  return (
    <div>
      <Box className="overflow-hidden">
        <Table>
          <TableRow type="header">
            <TableField />
            <TableField> Name </TableField>
            <TableField> Description </TableField>
            <TableField> Image </TableField>
            <TableField className="text-end">
                <div className="flex items-center justify-end">
                  <Button type="button" color="primary" icon="add_black_24dp" onClick={() => setShowModal(true)}>
                    create category
                  </Button>
                </div>
              </TableField>
          </TableRow>
          {
            categories.map((category) => (
              <TableRow key={category._id} type="body">
                <TableField />
                <TableField className="font-bold">
                  {category.category_name}
                </TableField>
                <TableField className="font-bold">
                  {category.category_description}
                </TableField>
                <TableField className="font-bold">
                  <img 
                    className='w-24 h-24 rounded-md'
                    src={`/images/${category.category_image}`} alt={category.category_image}
                  />
                </TableField>
                <TableField className="font-bold ">
                  <div className="flex items-center justify-end gap-1">
                    <Button type="button" color="danger" icon="highlight_off_black_24dp" onClick={() => handleDelete(category._id)}>
                      Delete
                    </Button>
                  </div>
                </TableField>
              </TableRow>
            ))
          }
          <TableEmptyFallback>
            <HelperBox note="You don't have any category yet" icon="feedback_black_24dp">
              <Button type="button" color="primary" icon="add_black_24dp" onClick={() => setShowModal(true)}>
                Create Your First Categorie
              </Button>
            </HelperBox>
          </TableEmptyFallback>
        </Table>
      </Box>
      { showModal && (
        <Modal>
          <CategoryCreate
            onClose={() => setShowModal(false)}
            onReloadRequest={() => reload()}
          />
        </Modal>
      )}
    </div>
  );
}

Categories.routerConfig = {
  type: 'page',   
  path: 'categories',
};
