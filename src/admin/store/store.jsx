import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import { Form, FormButtons } from '@/components/common/form/Form';
import Input from '@/components/common/form/Input';
import { useOverlay } from '@/services/overlay';
import { actionButton } from '@/components/common/ActionButtons';
import apis, { useFetch } from '@/services/api';
import { Modal } from '@/services/overlay';
import QR from './QR';

export default function Stores() {
  const [formData, setFormData] = useState({
    store_name: '',
    owner_name: '',
    store_tel: '',
    store_id: '',
    store_rate: '',
    store_address: '',
  });
  const [showQR, setShowQR] = useState(false);
  const { showToast } = useOverlay();
  const navigate = useNavigate();
  const [store, , reload] = useFetch(
    () => apis.getStore(),
    [],
    [],
  );

  useEffect(() => {
   if(store._id){
    navigate(`/admin/store/${store._id}`);
   }   
  }, [store])
  
  useEffect(() => {
    if(store){
      setFormData(store)
    }
  }, [store]);

  const actionButtons = useMemo(() => [
    actionButton({ title: 'save', type: 'primary', icon: 'done_black_24dp' }),
  ], []);

  const formAction = useCallback((formsData) => {
    if (store._id){
      return apis.updateStore(store._id, formsData);  
    }
    return apis.addStore(formsData).then(() => reload());
  }, [store]);

  const handleSuccess = useCallback(() => {
    showToast("saved successfully");
    reload();
  }, []);

  return (
    <div className="bg-base-100 p-4 rounded-md">
       <Box className="overflow-hidden">
        {
          store.store_qr && 
          <div className='w-full flex flex-row-reverse p-4'>
            <Button type="button" color="primary" icon="qr_code_black_24dp" onClick={() => setShowQR(true)}>
              Show QR Code
            </Button>
          </div>
        }
        <Form
          value={formData}
          onChange={setFormData}
          onSuccess={handleSuccess}
          action={formAction}
        >
          <div className="p-2 flex flex-wrap">
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_name" label='Store Name' validator={(v) => !!v} />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="owner_name" label='Owner Name' validator={(v) => !!v} />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_tel" label='Store Phone Number' validator={(v) => !!v} />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_id" label='Store Id' validator={(v) => !!v} />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Input name="store_rate" type="number" label='Store Rate' validator={(v) => !!v} />
            </div>
            <div className="w-full p-2">
              <Input name="store_address" label='Store Address' multiline validator={(v) => !!v} />
            </div>
          </div>
          <FormButtons
            className="p-4"
            buttons={actionButtons}
          />
        </Form>
      </Box>
      { showQR &&
        <Modal>
          <QR
            onClose={() => setShowQR(false)}
            qr={store.store_qr} 
          />
        </Modal>
      }
    </div>
  );
}

Stores.routerConfig = {
  type: 'page',
  path: 'store/:store_id',
};
