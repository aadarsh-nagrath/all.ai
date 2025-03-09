import React from 'react';

const plugins = [
  { name: 'Google Adwords', status: 'CONNECT', description: 'Far far away, behind the word mountains, far from the countries Vokalia.' },
  { name: 'Facebook', status: 'CONNECT', description: 'It is a paradisomatic country, in which roasted parts of sentences fly into your.' },
  { name: 'Dropbox', status: 'CONNECTED', description: 'Question Marks and devious Semikolj, but the Little Blind Text didn’t listen.' },
  { name: 'Github', status: 'CONNECT', description: 'He lay on his armour-like back, and if he lifted his head a little.' },
  { name: 'Google Analytics', status: 'CONNECTED', description: 'Separated they live in Bookmarksgrove right at the coast of the...' },
  { name: 'Mailchimp', status: 'CONNECT', description: 'Even the all-powerful Pointing has no control about the blind texts.' },
  { name: 'Slack', status: 'CONNECT', description: 'She packed her seven versalia, put her initial into the belt.' },
  { name: 'Shopify', status: 'CONNECT', description: 'The bedding was hardly able to cover it and seemed ready to slide off.' },
  { name: 'Instagram', status: 'CONNECTED', description: 'A small river named Duden flows by their place and supplies it with the necessary.' },
  { name: 'Google Calendar', status: 'CONNECT', description: 'The Big Oxmox advised her not to do so, because there were thousands of bad.' },
  { name: 'Asana', status: 'CONNECT', description: 'Gregor Samsa woke from troubled dreams, he found himself transformed.' },
  { name: 'Stripe', status: 'CONNECTED', description: 'Is many legs, pitifully thin compared with the size of the rest of him.' },
];

export default function Plugins() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">PLUGINS</h1>
      <p className="mb-8">Improve your workspace.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((plugin, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg">{plugin.name}</h2>
            <p className="text-sm text-gray-600 my-2">{plugin.description}</p>
            <button className={`mt-4 px-4 py-2 rounded text-sm font-medium ${
              plugin.status === 'CONNECTED' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {plugin.status === 'CONNECTED' ? 'Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}