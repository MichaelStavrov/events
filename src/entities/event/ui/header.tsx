import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/create`);
  };

  const isMainPage = router.pathname === '/';
  const isAuth = !!data?.user;

  return (
    <header
      className={`flex ${
        isMainPage ? 'justify-end' : 'justify-between'
      } items-center`}
    >
      {!isMainPage && (
        <Link
          href='/'
          className='text-sm font-semibold leading-6 text-gray-900 underline'
        >
          На главную
        </Link>
      )}

      {isAuth ? (
        <div className='flex gap-x-4 items-center'>
          <span>{data.user.name}</span>
          <button
            className='h-10 px-6 font-semibold rounded-md bg-indigo-600 text-white'
            onClick={handleClick}
          >
            Создать
          </button>
        </div>
      ) : (
        <Link
          href='api/auth/signin'
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          Войти
        </Link>
      )}
    </header>
  );
};
