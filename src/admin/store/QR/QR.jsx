import Box from '@/components/common/Box';
import Button from '@/components/common/Button';

export default function QR({ onClose, qr }) {

  return (
    <Box header='QR Image'className='p-6'>
        <div className='flex justify-center items-center'>
          <img className='w-40' src={qr} alt="" />
        </div>
        <div className='flex flex-row-reverse mt-4'>
          <Button type="button" color="normal" icon="close_black_24dp" onClick={onClose}>
            Close
          </Button>
        </div>
    </Box>
  );
}

QR.defaultProps = {
  onClose: () => {},
};
