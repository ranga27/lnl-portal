import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { TextInput } from '../components/UI/Form/Input';
import styles from '../styles/Home.module.css';

export default function Home() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loop Not Luck</title>
        <meta name='description' content='Loop Not Luck Portal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <p className='text-red-400'>Hello</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name='title'
          label='Title'
          errors={errors.title}
          control={control}
        />
      </form>
    </div>
  );
}
