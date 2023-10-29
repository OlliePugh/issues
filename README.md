Link to respesctive issue: https://github.com/callstack/react-native-testing-library/issues/1511

The issue is that the tests in `hooks/useJanus.test.ts` seem to fail incorrectly as the change in state is not captured correctly.

Commands to reproduce

```
npm ci
npm test
```
