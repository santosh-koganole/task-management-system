import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../redux/slices/api/authApiSlice", () => ({
  useLoginMutation: vi.fn(),
}));
describe("Login Component", () => {
  let loginMock;

  beforeEach(() => {
    loginMock = vi.fn();
    useLoginMutation.mockReturnValue([loginMock, { isLoading: false }]);
  });

  const setup = () =>
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

  test("renders login form correctly", () => {
    setup();
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(
      await screen.findByText(/Email Address is required!/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is required!/i)
    ).toBeInTheDocument();
  });

  test("calls login API on valid form submission", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() =>
      expect(loginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    );
  });

  test("displays error message on failed login attempt", async () => {
    loginMock.mockResolvedValueOnce({
      error: { data: { message: "Invalid credentials" } },
    });
    setup();
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
