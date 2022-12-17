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
import FoodCreate from './foodCreate';
import apis, { useFetch } from '@/services/api';
import { useParams } from 'react-router-dom';

export default function Foods() {
  const { store_id } = useParams();
  const [showModal, setShowModal] = useState();
  const [categories,] = useFetch(
    () => apis.getCategories(store_id),
    [],
    [],
  );

  const [foods, , reload] = useFetch(
    () => apis.getFoods(store_id),
    [],
    [],
  );
  
  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      return apis.removeFood(id).then(() => reload()); 
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
            <TableField> Price </TableField>
            <TableField> Category </TableField>
            <TableField> Image </TableField>
            <TableField className="text-end">
                <div className="flex items-center justify-end">
                  <Button type="button" color="primary" icon="add_black_24dp" onClick={() => setShowModal(true)}>
                    submit food
                  </Button>
                </div>
              </TableField>
          </TableRow>
          {
            foods.map((food) => (
              <TableRow key={food._id} type="body">
                <TableField />
                <TableField className="font-bold">
                  {food.food_name}
                </TableField>
                <TableField className="font-bold">
                  {food.food_description}
                </TableField>
                <TableField className="font-bold">
                  {parseInt(food.food_price).toLocaleString('en')}
                </TableField>
                <TableField className="font-bold">
                  {food.category_name}
                </TableField>
                <TableField className="font-bold">
                  <img 
                    className='w-24 h-24 rounded-md'
                    src={`/images/${food.food_image}`} alt={food.food_image}
                  />
                </TableField>
                <TableField className="font-bold ">
                  <div className="flex items-center justify-end gap-1">
                    <Button type="button" color="danger" icon="highlight_off_black_24dp" onClick={() => handleDelete(food._id)}>
                      Delete
                    </Button>
                  </div>
                </TableField>
              </TableRow>
            ))
          }
          <TableEmptyFallback>
            <HelperBox note="You don't have any food yet" icon="feedback_black_24dp">
              <Button type="button" color="primary" icon="add_black_24dp" onClick={() => setShowModal(true)}>
                Submit Your First Food
              </Button>
            </HelperBox>
          </TableEmptyFallback>
        </Table>
      </Box>
      { showModal && (
        <Modal>
          <FoodCreate
            categories={categories}
            onClose={() => setShowModal(false)}
            onReloadRequest={() => reload()}
          />
        </Modal>
      )}
    </div>
  );
};

Foods.routerConfig = {
  type: 'page',
  path: 'foods/:store_id',
};
