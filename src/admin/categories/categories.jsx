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

export default function Categories() {
  const [showModal, setShowModal] = useState();
  
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
          {/* {
            updates.map((category) => (
              <TableRow key={update.id} type="body">
                <TableField className="font-bold">
                  {category.name}
                </TableField>
                <TableField className="font-bold">
                  {category.description}
                </TableField>
                <TableField className="font-bold">
                  {category.image}
                </TableField>
              </TableRow>
            ))
          } */}
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
            // onReloadRequest={() => reload()}
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
