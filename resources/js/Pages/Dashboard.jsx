import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import PropType from 'prop-types';

export default function Dashboard({ site }) {
  return (
    <>
      <Head title={`Dashboard - ${site.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">You are logged in!</div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  site: PropType.shape({
    name: PropType.string,
  }).isRequired,
};
