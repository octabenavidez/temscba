<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class HelloMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reset_url;

    /**
     * Create a new message instance.
     */
    public function __construct($url)
    {
        $this->reset_url = $url;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Restablecer Contraseña',
        );
    }

    /**
     * Get the message content definition.  
     */
    public function content(): Content
    {
        return new Content(
            htmlString: "
                <h1 style='color: #4B1D85' >Reinicio de contraseña</h1>
                <p>Haz click <a href='{$this->reset_url}' style='color: #c77dff'>aqui</a> para reiniciar tu contraseña.</p>
                <br>
                <p>Si no has solicitado un reinicio de contraseña <span style='color: #c77dff'>ponte en contacto</span> con nosotros para resolver el problema.</p>
                
            "
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
