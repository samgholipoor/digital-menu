import api from '@/services/api';
import {
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Form, FormButtons } from '@/components/common/form/Form';
import Input from '@/components/common/form/Input';
import File from '@/components/common/form/File';
import Select from '@/components/common/form/Select';
import { actionButton } from '@/components/common/ActionButtons';
import Box from '@/components/common/Box';
import { useParams } from 'react-router-dom';

export default function FoodCreate({
  categories,
  onClose,
  onReloadRequest,
}) {
  const { store_id } = useParams();
  const [formData, setFormData] = useState({});

  const categoryOptions = useMemo(() => (
    categories.map((cat) => ({title: cat.category_name, value: cat._id}))
  ), [categories]);

  const formAction = useCallback((formData) => {
    const selectedCat = categoryOptions.filter((cat) => cat.value === formData.category_id)[0]
    const formatedData = { ...formData, category_name: selectedCat.title }
    return api.addFood(store_id, formatedData)
  },[]);

  const handleSuccess = useCallback(() => {
    onReloadRequest();
    onClose();
  }, [onClose, onReloadRequest]);

  const actionButtons = useMemo(() => [
    actionButton({
      title: 'Cancel',
      type: 'normal',
      icon: 'close_black_24dp',
      onClick: onClose,
    }),
    actionButton({
      title: 'Submit',
      type: 'primary',
      icon: 'save_black_24dp',
    }),
  ], [handleSuccess, onClose]);

  return (
    <Box header='Submit Food'>
      <Form
        value={formData}
        onChange={setFormData}
        action={formAction}
        onSuccess={handleSuccess}
      > 
        <div className='flex'>
          <div className="md:w-1/2 p-4">
            <Input name="food_name" label='Food Name' />
          </div>
          <div className="md:w-1/2 p-4">
            <Input name="food_description" label='Food Description' />
          </div>
        </div>
        <div className="flex">
          <div className="md:w-1/2 p-4">
            <Input name="food_price" label="Food Price" />
          </div>
          <div className="md:w-1/2 p-4">
            <Select name="category_id" label="Category" options={categoryOptions} />
          </div>
        </div>
        <div className="p-4">
          <File name="food_image" label='Food Image' />
        </div>
        <FormButtons
          className="p-4"
          buttons={actionButtons}
        />
      </Form>
    </Box>
  );
}

FoodCreate.defaultProps = {
  releases: [],
  onClose: () => {},
  onReloadRequest: () => {},
};
