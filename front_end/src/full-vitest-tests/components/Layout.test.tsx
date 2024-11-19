import { render } from '@testing-library/react';
import Layout from '../../components/Layout';
import { expect } from 'vitest';

describe('Layout Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
