<?php

namespace App\Filament\Pages\Auth;

use Filament\Actions\Action;
use Filament\Forms\Components\Component;
use Filament\Forms\Components\TextInput;
use Illuminate\Validation\ValidationException;

class Login extends \Filament\Pages\Auth\Login
{
    public function getHeading(): string
    {
        return 'Log In';
    }
    protected function getForms(): array
    {
        return [
            'form' => $this->form(
                $this->makeForm()
                    ->schema([
                        $this->getIdentifierFormComponent(),
                        $this->getPasswordFormComponent(),
                        $this->getRememberFormComponent(),
                    ])
                    ->statePath('data'),
            ),
        ];
    }

    protected function getIdentifierFormComponent(): Component
    {
        return TextInput::make('email')
            ->label('Email')
            ->placeholder('Masukkan alamat email')
            ->required()
            ->email()
            ->autofocus()
            ->autocomplete('username')
            ->extraInputAttributes(['tabindex' => 1]);
    }

    protected function getFormActions(): array
    {
        return [
            $this->getAuthenticateFormAction(),
            Action::make('back_to_site')
                ->label('Back to Site')
                ->icon('heroicon-m-arrow-uturn-left')
                ->url(url('/'))
                ->color('gray')
                ->extraAttributes(['tabindex' => 3]),
        ];
    }

    protected function getCredentialsFromFormData(array $data): array
    {
        return [
            'email' => (string) ($data['email'] ?? ''),
            'password' => $data['password'] ?? null,
        ];
    }

    protected function throwFailureValidationException(): never
    {
        throw ValidationException::withMessages([
            'data.email' => __('filament-panels::pages/auth/login.messages.failed'),
        ]);
    }
}
