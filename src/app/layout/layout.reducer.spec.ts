import {
  layoutReducer,
  initialState,
  layoutTitleSelector,
  layoutSelector
} from './layout.reducer';
import { LayoutActionTypes, ChangeTitle, PushMessage } from './layout.actions';
import { Message, Severity } from './layout';

describe('Layout Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = layoutReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`a "${LayoutActionTypes.ChangeTitle}" action`, () => {
    it('with "Title A" title payload, should reduce state with "Title A" title', () => {
      const action = new ChangeTitle('Title A');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.title).toBe('Title A');
    });

    it('with "Title B" title payload, should reduce state with "Title B" title', () => {
      const action = new ChangeTitle('Title B');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.title).toBe('Title B');
    });
  });

  describe(`a "${LayoutActionTypes.PushMessage}" action`, () => {
    it('with severity "info" and message "Message A", it reduces to a state with the messages array with that message', () => {
      const action = PushMessage.info('Message A');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.messages).toBeTruthy();
      expect(result.messages.length).toBe(1);
      expect(result.messages[0].type).toBe('info');
      expect(result.messages[0].message).toBe('Message A');
    });

    it('with severity "success" and message "Message B", it reduces to a state with the messages array with that message', () => {
      const action = PushMessage.success('Message B');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.messages).toBeTruthy();
      expect(result.messages.length).toBe(1);
      expect(result.messages[0].type).toBe('success');
      expect(result.messages[0].message).toBe('Message B');
    });

    it('with severity "warning" and message "Message C", it reduces to a state with the messages array with that message', () => {
      const action = PushMessage.warning('Message C');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.messages).toBeTruthy();
      expect(result.messages.length).toBe(1);
      expect(result.messages[0].type).toBe('warning');
      expect(result.messages[0].message).toBe('Message C');
    });

    it('with severity "danger" and message "Message D", it reduces to a state with the messages array with that message', () => {
      const action = PushMessage.danger('Message D');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.messages).toBeTruthy();
      expect(result.messages.length).toBe(1);
      expect(result.messages[0].type).toBe('danger');
      expect(result.messages[0].message).toBe('Message D');
    });
  });
});

describe('layoutSelector', () => {
  it('it selects the layout feature state', () => {
    const layout = initialState;
    const rootState = { layout };
    const result = layoutSelector(rootState);
    expect(result).toEqual(layout);
  });
});

describe('layoutTitleSelector', () => {
  it('with initial state it selects "E-PokédeX"', () => {
    const rootState = { layout: initialState };

    const result = layoutTitleSelector(rootState);

    expect(result).toBe('E-PokédeX');
  });

  it('with a state with "Title B" title it selects "Title B"', () => {
    const title = 'Title B';

    const rootState = { layout: { ...initialState, title } };

    const result = layoutTitleSelector(rootState);

    expect(result).toBe(title);
  });
});

describe('layoutMessagesSelector', () => {
  it('with initial state, it selects a empty array', () => {
    const rootState = { layout: { ...initialState } };

    const result = layoutMessagesSelector(rootState);

    expect(result).toBeTruthy();
    expect(result.length).toBe(0);
  });

  it('with a state with a message of severity "info" and message "Message A", it selects a message array with that message', () => {
    const message: Message = {
      type: Severity.INFO,
      message: 'Message A'
    };

    const rootState = { layout: { ...initialState, messages: [message] } };

    const result = layoutMessagesSelector(rootState);

    expect(result).toBeTruthy();
    expect(result.length).toBe(1);
    expect(result[0]).toBe(message);
  });
});
