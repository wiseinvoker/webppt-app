import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { expect } from 'chai';
import SlideEditor from './SlideEditor';
import api from '../api/axios';
import { MemoryRouter, useParams, useNavigate } from 'react-router-dom';

// Mocking react-router-dom, including MemoryRouter, useParams, and useNavigate
vi.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }) => children, // Mocking MemoryRouter to just render children
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mocking axios with a default export
vi.mock('../api/axios', () => ({
  __esModule: true, // This makes it compatible with default exports
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('SlideEditor', () => {
  it('should render correctly for creating a new slide', () => {
    vi.mocked(useParams).mockReturnValue({});
    render(
      <MemoryRouter>
        <SlideEditor />
      </MemoryRouter>
    );

    // Assert the form elements are rendered correctly
    expect(screen.getByLabelText(/slide title/i)).to.exist;
    expect(screen.getByPlaceholderText(/enter slide title/i)).to.exist;
    expect(screen.getByLabelText(/slide content/i)).to.exist;
    expect(screen.getByLabelText(/slide layout/i)).to.exist;
    expect(screen.getByRole('button', { name: /save slide/i })).to.exist;
  });

  it('should save a new slide when form is submitted', async () => {
    const mockNavigate = vi.fn();
    const mockPost = vi.spyOn(api, 'post').mockResolvedValue({});
    // Mock `useNavigate` to return the mock function `mockNavigate`
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <SlideEditor />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/slide title/i), { target: { value: 'New Slide' } });
    fireEvent.change(screen.getByLabelText(/slide content/i), { target: { value: 'Slide content' } });
    fireEvent.change(screen.getByLabelText(/slide layout/i), { target: { value: 'default' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save slide/i }));

    // Wait for the API call to finish and ensure the POST request was called
    await waitFor(() => expect(mockPost).toHaveBeenCalled());

    // Assert the API call was made with the correct data
    expect(mockPost).toHaveBeenCalledWith(
      '/slides',
      expect.objectContaining({
        title: 'New Slide',
        content: 'Slide content',
        layout: 'default',
      })
    );
    // Assert navigate was called (you can test the redirect here)
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should save an existing slide when form is submitted', async () => {
    const mockNavigate = vi.fn();

    const mockSlideData = {
      title: 'Updated Slide',
      content: 'Updated content',
      layout: 'image',
    };
    vi.mocked(api.get).mockResolvedValue({ data: mockSlideData });
    const mockPut = vi.spyOn(api, 'put').mockResolvedValue({});
    // Mock `useNavigate` to return the mock function `mockNavigate`
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    const mockUseParams = { id: '123' };
    vi.mocked(useParams).mockReturnValue(mockUseParams);

    render(
      <MemoryRouter>
        <SlideEditor />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/slide title/i), { target: { value: 'Updated Slide' } });
    fireEvent.change(screen.getByLabelText(/slide content/i), { target: { value: 'Updated content' } });
    fireEvent.change(screen.getByLabelText(/slide layout/i), { target: { value: 'image' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save slide/i }));

    // Wait for the API call to finish and ensure the PUT request was called
    await waitFor(() => expect(mockPut).toHaveBeenCalled());

    // Assert the API call was made with the correct data
    expect(mockPut).toHaveBeenCalledWith(
      '/slides/123',
      expect.objectContaining({
        title: 'Updated Slide',
        content: 'Updated content',
        layout: 'image',
      })
    );
    // Assert navigate was called (you can test the redirect here)
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should fetch slide data when editing an existing slide', async () => {
    const mockNavigate = vi.fn();
    const mockUseParams = { id: '123' }; // Mock useParams to return an ID for editing
    const mockSlideData = {
      title: 'Test Slide',
      content: 'This is a test slide content.',
      layout: 'default',
    };

    // Mocking useParams and axios
    vi.mocked(useParams).mockReturnValue(mockUseParams);  // Mock useParams to return the mock data
    vi.mocked(api.get).mockResolvedValue({ data: mockSlideData });

    render(
      <MemoryRouter>
        <SlideEditor />
      </MemoryRouter>
    );

    // Wait for the API call to complete and check the rendered title
    await waitFor(() => screen.getByDisplayValue(mockSlideData.title));

    // Assert the fetched data is displayed
    expect(screen.getByDisplayValue(mockSlideData.title)).to.exist;
    expect(screen.getByDisplayValue(mockSlideData.content)).to.exist;
  });
});
