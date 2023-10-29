import { renderHook, act, waitFor } from "@testing-library/react-native";
import {
  Client,
  Connection,
  Session,
  StreamingPlugin,
} from "janus-gateway-tsdx";

import useJanus from ".";
import { instantiateClassMock } from "../../utils/test";

// Mock the JanusClient and its methods
jest.mock("janus-gateway-tsdx");

// Mock React Native modules and other dependencies
jest.mock("react-native-uuid", () => ({
  v4: jest.fn().mockReturnValue("mocked-uuid"),
}));
jest.mock("./MediaDevicesShim", () => ({
  default: jest.fn(),
  __esModule: true,
}));
jest.mock("./WebRtcShim", () => ({
  default: jest.fn(),
  __esModule: true,
}));

describe("useJanus", () => {
  const mockClient = instantiateClassMock(Client);
  (Client as jest.Mock).mockReturnValue(mockClient);
  const mockConnection = instantiateClassMock(Connection);
  const mockSession = instantiateClassMock(Session);
  const mockStreamingPlugin = instantiateClassMock(StreamingPlugin);

  mockClient.createConnection.mockResolvedValue(mockConnection);
  mockConnection.createSession.mockResolvedValue(mockSession);
  mockSession.attachPlugin.mockResolvedValue(mockStreamingPlugin);
  mockStreamingPlugin.watch.mockResolvedValue({ jsep: "wibble" });

  it("should call the watch function and set remoteStream when called", async () => {
    const mockTrack = jest.fn();

    const { result, rerender } = renderHook(() =>
      useJanus({
        url: "ws://example.com/janus",
        connectionOptions: { keepalive: true },
        streamId: 123,
      })
    );

    await act(async () => {
      await result.current.watch();

      expect(mockStreamingPlugin.on).toHaveBeenCalledWith(
        "pc:track:remote",
        expect.any(Function)
      );
      mockStreamingPlugin.on.mock.calls;
      const onMethod = mockStreamingPlugin.on.mock.calls[0][1];

      onMethod({ streams: [mockTrack] });
    });

    rerender(null);

    await waitFor(() => {
      expect(result.current.remoteStream).toBe(mockTrack);
    });
  });

  it("should initialize JanusClient with the provided URL and connectionOptions", async () => {
    const url = "ws://example.com/janus";
    const connectionOptions = { keepalive: true };
    const { result } = renderHook(() =>
      useJanus({ url, connectionOptions, streamId: 123 })
    );
    await waitFor(() => {
      expect(result.current).toBeDefined();
      expect(result.current.watch).toBeDefined();
      expect(result.current.remoteStream).toBeUndefined();
      expect(result.current.stop).toBeDefined();
    });
  });

  it("should call the stop function and reset remoteStream when called", async () => {
    const { result } = renderHook(() =>
      useJanus({
        url: "ws://example.com/janus",
        connectionOptions: { keepalive: true },
        streamId: 123,
      })
    );

    await act(async () => {
      result.current.watch();
      await waitFor(() => {
        expect(result.current.remoteStream).toBeDefined();
      });

      result.current.stop();
      await waitFor(() => {
        expect(result.current.remoteStream).toBeNull();
      });
    });
  });
});
