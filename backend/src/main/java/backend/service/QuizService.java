package backend.service;

import backend.dto.OpcaoDto;
import backend.dto.PerguntaDto;
import backend.dto.QuizRequest;
import backend.entity.Usuario;
import backend.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class QuizService {

    private final UsuarioRepository usuarioRepository;

    private static final List<PerguntaDto> PERGUNTAS = List.of(
            new PerguntaDto(1, "Qual tipo de destino mais te atrai?", List.of(
                    new OpcaoDto("Praia", "praia"),
                    new OpcaoDto("Montanha", "montanha"),
                    new OpcaoDto("Cidade histórica", "historia"),
                    new OpcaoDto("Campo / Interior", "campo"),
                    new OpcaoDto("Natureza selvagem", "natureza")
            )),
            new PerguntaDto(2, "Como você prefere aproveitar a viagem?", List.of(
                    new OpcaoDto("Aventura e adrenalina", "aventura"),
                    new OpcaoDto("Descanso e relaxamento", "relaxamento"),
                    new OpcaoDto("Cultura e aprendizado", "cultural"),
                    new OpcaoDto("Gastronomia", "gastronomia"),
                    new OpcaoDto("Ecoturismo", "ecologia")
            )),
            new PerguntaDto(3, "Com quem você costuma viajar?", List.of(
                    new OpcaoDto("Sozinho(a)", "solo"),
                    new OpcaoDto("Com meu par", "romantico"),
                    new OpcaoDto("Com a família", "familia"),
                    new OpcaoDto("Com amigos", "amigos"),
                    new OpcaoDto("Em grupo / excursão", "grupo")
            )),
            new PerguntaDto(4, "Qual é o seu orçamento para a viagem?", List.of(
                    new OpcaoDto("Econômico", "economico"),
                    new OpcaoDto("Moderado", "moderado"),
                    new OpcaoDto("Confortável", "confortavel"),
                    new OpcaoDto("Luxo", "luxo")
            )),
            new PerguntaDto(5, "Quanto tempo você tem disponível?", List.of(
                    new OpcaoDto("Fim de semana (até 3 dias)", "curto"),
                    new OpcaoDto("Uma semana", "medio"),
                    new OpcaoDto("Duas semanas", "longo"),
                    new OpcaoDto("Mais de duas semanas", "extendido")
            ))
    );

    public QuizService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<PerguntaDto> getPerguntas() {
        return PERGUNTAS;
    }

    // Funciona tanto para primeiro preenchimento quanto para refazer o quiz (RN3):
    // as tags antigas são limpas e substituídas pelas novas respostas.
    public void salvarPerfil(QuizRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        usuario.getTags().clear();
        usuario.getTags().addAll(request.tags());
        usuario.setQuizCompleto(true);
        usuarioRepository.save(usuario);
    }
}
