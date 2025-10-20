import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';


export default function NotFoundPage() {
  return (
    <>
      <main>
        <section className='bg-secondary'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-yellow-300'
            />
            <h1 className='mt-8 text-primary'>Page Not Found</h1>
              Back to Home
          </div>
        </section>
      </main>
    </>
  );
}
