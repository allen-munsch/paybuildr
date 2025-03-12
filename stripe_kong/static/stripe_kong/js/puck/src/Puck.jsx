// stripe_kong/static/stripe_kong/js/puck/src/PuckEditor.jsx
import React, { useState, useEffect } from 'react';
import { Puck, DefaultRenderers } from '@measured/puck';
import '@measured/puck/dist/index.css';

// Define custom components that will be available in the Puck editor
const components = {
  Hero: {
    render: ({ title, subtitle, buttonText, buttonUrl, backgroundColor }) => (
      <div style={{ backgroundColor, padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {buttonText && buttonUrl && (
          <a 
            href={buttonUrl} 
            style={{ 
              display: 'inline-block',
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '0.25rem',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            {buttonText}
          </a>
        )}
      </div>
    ),
    defaultProps: {
      title: 'Welcome to Our Service',
      subtitle: 'Sign up today and get started with our amazing features',
      buttonText: 'Sign Up',
      buttonUrl: '/signup/',
      backgroundColor: '#f3f4f6'
    },
    fields: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      buttonText: { type: 'text' },
      buttonUrl: { type: 'text' },
      backgroundColor: { type: 'color' }
    }
  },
  PricingTable: {
    render: ({ title, plans }) => (
      <div style={{ padding: '3rem 1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{title}</h2>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          {plans.map((plan, index) => (
            <div key={index} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '2rem',
              width: '280px',
              boxShadow: plan.highlighted ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
              position: 'relative',
              backgroundColor: plan.highlighted ? '#f9fafb' : 'white'
            }}>
              {plan.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.25rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  Popular
                </div>
              )}
              <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{plan.name}</h3>
              <div style={{ 
                textAlign: 'center', 
                fontSize: '2.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                ${plan.price}<span style={{ fontSize: '1rem', color: '#6b7280' }}>/{plan.interval}</span>
              </div>
              <ul style={{ 
                listStyleType: 'none',
                padding: 0,
                margin: '2rem 0'
              }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={plan.buttonUrl} 
                data-plan-id={plan.id}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: plan.highlighted ? '#2563eb' : 'white',
                  color: plan.highlighted ? 'white' : '#2563eb',
                  border: plan.highlighted ? 'none' : '1px solid #2563eb',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    ),
    defaultProps: {
      title: 'Choose Your Plan',
      plans: [
        {
          id: 1,
          name: 'Basic',
          price: '9.99',
          interval: 'month',
          features: ['1,000 API calls', '2 projects', 'Basic support'],
          buttonText: 'Choose Basic',
          buttonUrl: '/checkout/basic/',
          highlighted: false
        },
        {
          id: 2,
          name: 'Pro',
          price: '29.99',
          interval: 'month',
          features: ['10,000 API calls', 'Unlimited projects', 'Priority support', 'Advanced analytics'],
          buttonText: 'Choose Pro',
          buttonUrl: '/checkout/pro/',
          highlighted: true
        },
        {
          id: 3,
          name: 'Enterprise',
          price: '99.99',
          interval: 'month',
          features: ['100,000 API calls', 'Unlimited everything', '24/7 support', 'Custom integration'],
          buttonText: 'Contact Sales',
          buttonUrl: '/contact/',
          highlighted: false
        }
      ]
    },
    fields: {
      title: { type: 'text' },
      plans: {
        type: 'array',
        arrayFields: {
          id: { type: 'number' },
          name: { type: 'text' },
          price: { type: 'text' },
          interval: { 
            type: 'select',
            options: [
              { label: 'Month', value: 'month' },
              { label: 'Year', value: 'year' }
            ]
          },
          features: { type: 'array' },
          buttonText: { type: 'text' },
          buttonUrl: { type: 'text' },
          highlighted: { type: 'boolean' }
        }
      }
    }
  },
  FeatureSection: {
    render: ({ title, description, features }) => (
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>{title}</h2>
          <p style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>{description}</p>
        </div>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <span role="img" aria-label={feature.title}>
                  {feature.icon}
                </span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: '#6b7280' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    defaultProps: {
      title: 'Our Features',
      description: 'Everything you need to succeed with our platform',
      features: [
        {
          icon: '🚀',
          title: 'Fast Integration',
          description: 'Get up and running quickly with our simple API'
        },
        {
          icon: '🔒',
          title: 'Secure Payments',
          description: 'Your transactions are protected with enterprise-grade security'
        },
        {
          icon: '📊',
          title: 'Advanced Analytics',
          description: 'Gain insights into your business with detailed reporting'
        },
        {
          icon: '🔌',
          title: 'API Management',
          description: 'Control your APIs with our powerful Kong integration'
        }
      ]
    },
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      features: {
        type: 'array',
        arrayFields: {
          icon: { type: 'text' },
          title: { type: 'text' },
          description: { type: 'textarea' }
        }
      }
    }
  },
  ContactForm: {
    render: ({ title, description, buttonText, formAction }) => (
      <div style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>{description}</p>
        <form action={formAction} method="post" style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
            <input type="text" id="name" name="name" style={{ 
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db'
            }} required />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
            <input type="email" id="email" name="email" style={{ 
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db'
            }} required />
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
            <textarea id="message" name="message" rows="4" style={{ 
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db'
            }} required></textarea>
          </div>
          <button type="submit" style={{ 
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            {buttonText}
          </button>
        </form>
      </div>
    ),
    defaultProps: {
      title: 'Contact Us',
      description: 'Have a question? Send us a message and we\'ll get back to you as soon as possible.',
      buttonText: 'Send Message',
      formAction: '/contact/'
    },
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      buttonText: { type: 'text' },
      formAction: { type: 'text' }
    }
  }
};

const PuckEditor = ({ initialData, onSave, readOnly = false }) => {
  const [data, setData] = useState(initialData || { root: { children: [] } });

  // Load data from API if initialData is not provided
  useEffect(() => {
    if (!initialData && !readOnly) {
      // You might want to load from an API here
    }
  }, [initialData, readOnly]);

  const handleSave = (newData) => {
    setData(newData);
    if (onSave) {
      onSave(newData);
    }
  };

  // If in readOnly mode, just render the content
  if (readOnly) {
    return (
      <Puck.Render
        data={data}
        components={components}
        renderMode="edit"
      />
    );
  }

  // Otherwise, render the editor
  return (
    <Puck
      data={data}
      onPublish={handleSave}
      components={components}
      renderMode="edit"
    />
  );
};

export default PuckEditor;
