import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from './login-page';

const meta = {
    title: 'Pages/LoginPage',
    component: LoginPage,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};
